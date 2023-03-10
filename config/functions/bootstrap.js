module.exports = async () => {
  // set meeting default permissions for authenticated role
  const permissions = {
    application: {
      controllers: {
        meeting: {
          count: {
            enabled: false,
          },
          findOne: {
            enabled: true,
          },
          find: {
            enabled: true,
          },
          create: {
            enabled: true,
          },
          delete: {
            enabled: true,
          },
          update: {
            enabled: true,
          },
        },
      },
    },
  };
  const authenticatedRole = await strapi
    .query("role", "users-permissions")
    .findOne({ type: "authenticated" });
  await strapi.plugins[
    "users-permissions"
  ].services.userspermissions.updateRole(authenticatedRole.id, { permissions });
};
