import hasNoUserAccess from '../../../lib/utils'
import prisma from '../../../lib/prisma'

import type { NextApiRequest, NextApiResponse } from 'next'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const hasNoAccess = await hasNoUserAccess({req})
  if (hasNoAccess) {
    return res.status(400).send({ error: 'No access!' })
  }

  const team_members = await prisma.team_members.findMany()

  return res.send(team_members)
}