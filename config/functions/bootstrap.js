module.exports = async () => {
  const promises = [];
  const authenticated = await strapi
    .query("role", "users-permissions")
    .findOne({ type: "authenticated" });
  authenticated.permissions.forEach((permission) => {
    if (
      permission.type === "application" &&
      permission.controller === "meeting" &&
      permission.action !== "count"
    ) {
      promises.push(
        strapi
          .query("permission", "users-permissions")
          .update({ id: permission.id }, { ...permission, enabled: true })
      );
    }
  });
  await Promise.all(promises);
};
