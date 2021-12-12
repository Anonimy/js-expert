const UserFactory = require("./factory/userFactory");

;(async () => {
  const userFactory = await UserFactory.createInstance()
  const results = await userFactory.find({ name: '*' })
  console.log({ results })
})()