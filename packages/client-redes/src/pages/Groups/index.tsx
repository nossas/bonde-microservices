import React, { useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import {
  Page,
  Flexbox2 as Flexbox,
  Spacing,
  Dropdown,
  DropdownItem,
  Title
} from "bonde-styleguide";
import ReactTable from "react-table";
import { useStoreActions } from "easy-peasy";

import "react-table/react-table.css";
import columns from "./columns";
import filters from "./filters";
import { Wrap } from "./styles";
import { Individual } from "../../graphql/FetchIndividuals";
import FetchUsersByGroup from "../../graphql/FetchUsersByGroup";

type FilterData = {
  name: string;
  items: Array<{ onClick: () => void; option: string }>;
};

const Filters = ({ filters }: { filters: Array<FilterData> }): JSX.Element => {
  return (
    <Flexbox horizontal>
      {filters.map(
        ({ items, name }, i): React.ReactNode => (
          <Spacing key={`filter-types-${i}`} margin={{ right: 20 }}>
            <Dropdown label={name} inverted>
              {items.map(
                ({ onClick, option }, i): React.ReactNode => (
                  <DropdownItem key={`options-${i}`} onClick={onClick}>
                    {option}
                  </DropdownItem>
                )
              )}
            </Dropdown>
          </Spacing>
        )
      )}
    </Flexbox>
  );
};

type TableData = {
  volunteers: Individual;
  individuals: Individual;
};

const Groups = () => {
  const { pathname } = useLocation();
  const kind = pathname.split("/")[2];
  const { push } = useHistory();
  const setTable = useStoreActions(
    (actions: { table: { setTable: ({ individuals, volunteers }) => void } }) =>
      actions.table.setTable
  );

  useEffect(() => {
    push("/groups/volunteers");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <FetchUsersByGroup>
      {({
        volunteers,
        individuals,
        filters: filtersValues,
        changeFilters,
        page
      }): React.ReactNode => {
        const data: TableData = {
          volunteers: volunteers.data,
          individuals: individuals.data
        };
        setTable({
          individuals: individuals.data,
          volunteers: volunteers.data
        });

        const count = {
          volunteers: Number(volunteers.count) || 0,
          individuals: Number(individuals.count) || 0
        };

        const pages =
          kind === "volunteers"
            ? Math.ceil(count.volunteers / filtersValues.rows)
            : Math.ceil(count.individuals / filtersValues.rows);

        const resizeRow = count[kind] < 1000 ? count[kind] : filtersValues.rows;

        return (
          <Page>
            <Flexbox middle>
              <Wrap>
                <Spacing margin={{ bottom: 20 }}>
                  <Filters
                    filters={filters({
                      volunteersCount: count.volunteers,
                      individualsCount: count.individuals,
                      filters: { values: filtersValues, change: changeFilters },
                      history: push,
                      kind
                    })}
                  />
                </Spacing>
                <Spacing margin={{ bottom: 20 }}>
                  <Title.H4 margin={{ bottom: 30 }}>
                    Total ({count[kind]})
                  </Title.H4>
                </Spacing>
                <ReactTable
                  manual
                  sortable={false}
                  data={data[kind]}
                  columns={columns(pathname)}
                  pageSize={resizeRow}
                  pageSizeOptions={[25, 50, 100, 200, 500, 1000]}
                  page={page}
                  pages={pages}
                  onPageChange={(page: number): void => changeFilters({ page })}
                  onPageSizeChange={(rows: number): void =>
                    changeFilters({ rows })
                  }
                  previousText="Anterior"
                  nextText="Próximo"
                  pageText="Página"
                  ofText="de"
                  rowsText="linhas"
                  // Accessibility Labels
                  className="-striped -highlight"
                />
              </Wrap>
            </Flexbox>
          </Page>
        );
      }}
    </FetchUsersByGroup>
  );
};

export default Groups;
