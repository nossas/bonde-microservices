import axios from "axios";
import { logger } from "./logger";
import { SubscribeIndividual } from "./types/individual";
import { 
  GoogleMapsResponse, 
  GMAPS_ERRORS, 
  ConvertCepRes,
  IndividualGeolocation
} from './types/geolocation'

const getCityAndState = (addressComponents): Array<string> => {
  let state: string | undefined;
  let city: string | undefined;
  // let country: string | undefined

  addressComponents.forEach(
    ({
      types,
      short_name: shortName
    }: {
      types: string[];
      short_name: string;
    }) => {
      if (types.includes("administrative_area_level_1")) {
        state = shortName;
      }
      if (types.includes("administrative_area_level_2")) {
        city = shortName;
      }
      // if (types.includes('country')) {
      //   country = shortName
      // }
    }
  );

  // if (country !== 'BR') {
  //   state = undefined
  //   city = undefined
  // }

  return [state, city];
};

const convertCepToAddressWithGoogleApi = async (
  individual: SubscribeIndividual
): Promise<ConvertCepRes> => {
  const { GOOGLE_MAPS_API_KEY } = process.env;
  if (!GOOGLE_MAPS_API_KEY) {
    throw new Error(
      "Please specify the `GOOGLE_MAPS_API_KEY` environment variable."
    );
  }

  const cep = individual.zipcode;
  let data;

  try {
    logger.log("info", `requesting google with cep ${cep}...`);
    const response: GoogleMapsResponse = await axios.post(
      "https://maps.googleapis.com/maps/api/geocode/json",
      undefined,
      {
        params: {
          address: cep,
          key: GOOGLE_MAPS_API_KEY
        }
      }
    );
    logger.log("info", "response!", response.data);
    data = response.data;
  } catch (e) {
    logger.log("error", "falha na requisição para o google maps");
    return {
      error: GMAPS_ERRORS.REQUEST_FAILED
    };
  }

  if (data.status === "ZERO_RESULTS") {
    logger.log(
      "error",
      `google maps return with zero result (id, zipcode): ${individual.id}, ${cep}`
    );

    const i: IndividualGeolocation = {
      id: individual.id,
      coordinates: {
        latitude: "ZERO_RESULTS",
        longitude: "ZERO_RESULTS"
      },
      address: `Cep Incorreto - ${individual.zipcode}`,
      state: "ZERO_RESULTS",
      city: "ZERO_RESULTS"
    };

    return i
  } if (data.status === "OK") {
    const {
      results: [
        {
          geometry: {
            location: { lat, lng }
          },
          address_components: addressComponents,
          formatted_address: address
        }
      ]
    } = data;

    const [state, city] = getCityAndState(addressComponents);

    const i: IndividualGeolocation = {
      id: individual.id,
      coordinates: {
        latitude: lat.toString(),
        longitude: lng.toString()
      },
      address,
      state,
      city
    };

    logger.log("info", "updated individual geolocation data", i);

    return i;
  }

  return {
    error: GMAPS_ERRORS.INVALID_INPUT
  };
};

export default convertCepToAddressWithGoogleApi