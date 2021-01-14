'use strict'

const Role = use('Role')

class TeamController {
  async index ({ request, response, auth }) {
    const teams = await auth.user.teams().fetch()

    return teams
  }

  async store ({ request, response, auth }) {
    const data = request.only(['name'])

    const team = await auth.user.teams().create({
      ...data,
      user_id: auth.user.id
    })

    const teamJoin = await auth.user.teamJoins().where('team_id', team.id).first()

    const admin = await Role.findBy('slug', 'administrator')

    await teamJoin.roles().attach([admin.id])

    return team
  }

  async show ({ params, auth }) {
    const team = await auth.user.teams().where('teams.id', params.id).first()

    return team
  }

  async update ({ params, request, auth }) {
    const team = await auth.user.teams().where('teams.id', params.id).first()
    const data = request.only(['name'])

    team.merge({ ...data })

    await team.save()

    return team
  }

  async destroy ({ params, auth, response }) {
    const team = await auth.user.teams().where('teams.id', params.id).first()

    await team.delete()

    return response.status(204).send()
  }
}

module.exports = TeamController