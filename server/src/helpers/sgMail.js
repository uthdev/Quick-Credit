import sgMail from '@sendgrid/mail';

export const mailSender = async (loan) => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  let msg;
  if (loan.status === 'approved') {
    msg = {
      to: loan.user_email,
      from: 'adelekegbolahan92@gmail.com',
      subject: 'Quick credit loan application',
      html: `<p>We are glad to notify you that your loan application of ${loan.amount} has been approved.</p><strong>Please reach us through this mail for any information you require</strong>`,
    };
  }
  if (loan.status === 'rejected') {
    msg = {
      to: loan.user_email,
      from: 'services@quick-credit.com',
      subject: 'Quick credit loan application ',
      html: `<p>We are sorry to notify you that your loan applicationof ${loan.amount} has been rejected.</p><strong>Please reach us through this mail for any information you require</strong>`,
    };
  }
  await sgMail.send(msg);
}