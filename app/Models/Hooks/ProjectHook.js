'use strict'

const Ws = use('Ws')

const ProjectHook = exports = module.exports = {}

ProjectHook.method = async (modelInstance) => {
}

ProjectHook.sendWs = async project => {
  const channel = Ws.getChannel('project:*')

  if (!channel) return

  const topic = channel.topic(`project:${project.team_id}`)

  if (topic) {
    topic.broadcast('message', project)
  }
}
