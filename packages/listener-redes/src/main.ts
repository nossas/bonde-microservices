import * as throng from 'throng'
import { fetchRedesGroups, subscriptionFormEntries } from './features/settings'


throng({
  workers: 1,
  start: async (id: number) => {
    console.log(`Started worker ${id}`)

    try {
      const groups = await fetchRedesGroups()
      const widgets = groups.map((g: any) => ({
        id: g.widget_id,
        group_id: g.id,
        metadata: g.metadata
      }))

      await subscriptionFormEntries(widgets)
    } catch (err) {
      console.error('throng err: '.red, err)
    }

    process.on('SIGTERM', function() {
      console.log(`Worker ${id} exiting`)
      console.log('Cleanup here')
      process.exit()
    })
  }
 })
