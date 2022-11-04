import hasNoUserAccess from '../../../lib/utils'
import prisma from '../../../lib/prisma'

import type { NextApiRequest, NextApiResponse } from 'next'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const hasNoAccess = await hasNoUserAccess({req})
  if (hasNoAccess) {
    return res.status(400).send({ error: 'No access!' })
  }

  const skipCount = parseInt((req.query.skip).toString())
  const resultSource = (req.query.resultSource).toString()

  const order = (req.query.orderBy).toString()
  const sortOrder = (req.query.sortOrder).toString() === 'desc' ? 'desc' : 'asc'
  const selectedTeamMembers = 
    ((req.query.selectedTeamMembers).toString()).split(",")


  let query:any = prisma.bookings
  if (resultSource === 'prospects') {
    query = prisma.prospects
  }
  
  let orderBy:any = { id: sortOrder }
  if (order === 'startsat') {
    orderBy = { startsat: sortOrder }
  }

  let filterByTeamMembers:any = { }
  if (selectedTeamMembers[0] !== '') {
    filterByTeamMembers = { team_member: { in: selectedTeamMembers } }
  }
  let data = []
  if (resultSource === 'prospects') {
    data = await query.findMany({
      orderBy: orderBy,
      skip: skipCount,
      take: 10
    })
  } else {
    data = await query.findMany({
      where: filterByTeamMembers,
      orderBy: orderBy,
      skip: skipCount,
      take: 10
    })
  }

  return res.send(data)
}