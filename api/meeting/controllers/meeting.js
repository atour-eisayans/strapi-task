const { parseMultipartData, sanitizeEntity } = require("strapi-utils");

const userIsMeetingOwner = async (meetingId, userId) => {
  const [meeting] = await strapi.services.meeting.find({
    id: meetingId,
    "userId.id": userId,
  });

  return !!meeting;
};

module.exports = {
  async create(ctx) {
    let entity;
    if (ctx.is("multipart")) {
      const { data, files } = parseMultipartData(ctx);
      data.userId = ctx.state.user.id;
      entity = await strapi.services.meeting.create(data, { files });
    } else {
      entity = await strapi.services.meeting.create({
        ...ctx.request.body,
        userId: ctx.state.user.id,
      });
    }
    return sanitizeEntity(entity, { model: strapi.models.meeting });
  },
  async update(ctx) {
    const { id } = ctx.params;

    if (!(await userIsMeetingOwner(id, ctx.state.user.id))) {
      return ctx.notFound("Entity not found");
    }

    let entity;
    if (ctx.is("multipart")) {
      const { data, files } = parseMultipartData(ctx);
      entity = await strapi.services.meeting.update({ id }, data, {
        files,
      });
    } else {
      entity = await strapi.services.meeting.update({ id }, ctx.request.body);
    }

    return sanitizeEntity(entity, { model: strapi.models.meeting });
  },
  async delete(ctx) {
    const { id } = ctx.params;

    if (!(await userIsMeetingOwner(id, ctx.state.user.id))) {
      return ctx.notFound("Entity not found");
    }

    const entity = await strapi.services.meeting.delete({ id });
    return sanitizeEntity(entity, { model: strapi.models.meeting });
  },
  async findOne(ctx) {
    const { id } = ctx.params;

    const entity = await strapi.services.meeting.findOne({
      id,
      "userId.id": ctx.state.user.id,
    });

    if (!entity) {
      return ctx.notFound("Entity not found");
    }

    return sanitizeEntity(entity, { model: strapi.models.meeting });
  },
  async find(ctx) {
    let entities;
    const fetchOptions = {
        ...ctx.query,
        "userId.id": ctx.state.user.id,
    };
    if (ctx.query._q) {
      entities = await strapi.services.meeting.search(fetchOptions);
    } else {
      entities = await strapi.services.meeting.find(fetchOptions);
    }

    return entities.map((entity) =>
      sanitizeEntity(entity, { model: strapi.models.meeting })
    );
  },
};
