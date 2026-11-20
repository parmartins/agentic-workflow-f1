import type { Meta, StoryObj } from '@storybook/react-vite'
import { withRouter } from '@/test/story-router'
import { DriverStandingsPage } from './DriverStandingsPage'

const meta = { title: 'Pages/Driver standings', component: DriverStandingsPage } satisfies Meta<typeof DriverStandingsPage>
export default meta
export const Default: StoryObj<typeof meta> = { decorators: [withRouter('/standings/drivers')] }
