/** Send transactional email via Resend */
export async function sendEmail(
  apiKey: string,
  to: string,
  subject: string,
  html: string,
  from = 'noreply@DOMAIN',
): Promise<boolean> {
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ from, to, subject, html }),
  });
  return res.ok;
}
