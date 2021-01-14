'use strict'

class ProjectController {
  async index ({ request }) {
    const projects = request.team.projects().fetch()

    return projects
  }

  async store ({ request, response }) {
    const data = request.only(['title'])
    const project = request.team.projects().create(data)

    return project
  }

  async show ({ params, request }) {
    const project = await request.team.projects().where('id', params.id).first()

    return project
  }

  async update ({ params, request, response }) {
    const project = await request.team.projects().where('id', params.id).first()
    const data = request.only(['title'])

    project.merge(data)

    await project.save()

    return project
  }

  async destroy ({ params, request, response }) {
    const project = await request.team.projects().where('id', params.id).first()

    await project.delete()

    return response.status(204).send()
  }
}

module.exports = ProjectController
