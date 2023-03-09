module.exports = {
  lifecycles: {
    async afterCreate(result, data) {
      const userEmail = result.userId.email;
      if (userEmail) {
        // We did not use await to response faster to the client
        // if it's necessary that email be sent for the rest of the process
        // then we must use await and handle it
        strapi.plugins["email"].services.email.send({
          to: userEmail,
          subject: "New meeting has been created",
          text: result.notificationText,
        });
      }
    },
  },
};
