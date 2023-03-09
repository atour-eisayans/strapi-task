const createNotificationText = (data) => `
A new meeting has been set.
Meeting Date: ${data.meetingDate}
Duration: ${data.meetingDuration} minutes
`;

module.exports = {
  lifecycles: {
    async afterCreate(result, data) {
      const notificationText = createNotificationText(result);
      await strapi.services.notification.create({
        userId: data.userId,
        notificationText,
      });
    },
  },
};
