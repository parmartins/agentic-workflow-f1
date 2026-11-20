import { screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { season } from '@/data/season'
import { driverStandings } from '@/lib/standings'
import { renderAt } from '@/test/render'

describe('DriverStandingsPage', () => {
  it('shows one row per driver, leader first', () => {
    renderAt('/standings/drivers')
    const expected = driverStandings(season.races)
    expect(screen.getByRole('heading', { name: 'Driver standings' })).toBeInTheDocument()
    const rows = within(screen.getByRole('table')).getAllByRole('row')
    expect(rows).toHaveLength(expected.length + 1)
    expect(within(rows[1]!).getAllByRole('cell')[0]).toHaveTextContent('1')
    expect(within(rows[1]!).getAllByRole('cell')[3]).toHaveTextContent(String(expected[0]!.points))
  })
})
