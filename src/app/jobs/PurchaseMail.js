const Mail = require("../services/Mail");

class PurchaseMail {
  get key() {
    return "Purchase";
  }

  async handle(job, done) {
    const { ad, user, content } = job.data;
    await Mail.sendMail({
      from: '"wagner" <wagnerricardonet@gmail.com',
      to: ad.author.email,
      subject: `solicitação de compra:${ad.title}`,
      //html: `<p>Teste ${content}</p>`
      template: "purchase",
      context: { user, content, ad }
    });

    return done();
  }
}

module.exports = new PurchaseMail();
