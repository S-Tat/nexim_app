/**
 * Notification stubs for overdue task reminders.
 *
 * In production, wire sendEmailNotification to Resend or SendGrid.
 * For now these are silent no-ops until a mail provider is wired.
 */

export type TaskNotification = {
  email: string;
  taskTitle: string;
  deadlineDays: number;
  daysOverdue: number;
  locale: string;
};

/**
 * Send an email notification for an overdue task.
 * Stub — replace body with Resend/SendGrid SDK call.
 */
export async function sendEmailNotification(
  _notification: TaskNotification,
): Promise<void> {
  // TODO: Replace with real email service (Resend / SendGrid)
  //
  // Example with Resend:
  //   import { Resend } from "resend";
  //   const resend = new Resend(process.env.RESEND_API_KEY);
  //   await resend.emails.send({
  //     from: "Nexim <noreply@nexim.world>",
  //     to: notification.email,
  //     subject: `Overdue: ${notification.taskTitle}`,
  //     html: `<p>Your task "${notification.taskTitle}" is ${notification.daysOverdue} day(s) overdue.</p>`,
  //   });
  //
  // Example with SendGrid:
  //   import sgMail from "@sendgrid/mail";
  //   sgMail.setApiKey(process.env.SENDGRID_API_KEY!);
  //   await sgMail.send({ ... });

}

/**
 * Check tasks and send overdue notifications.
 * Call from a cron job or Vercel cron route.
 */
export async function checkOverdueAndNotify(opts: {
  email: string;
  tasks: { title: string; deadline_days: number; completed: boolean }[];
  createdAt: number;
  locale: string;
}): Promise<number> {
  const now = Date.now();
  const elapsed = Math.floor((now - opts.createdAt) / (1000 * 60 * 60 * 24));
  let sent = 0;

  for (const task of opts.tasks) {
    if (task.completed) continue;
    const overdue = elapsed - task.deadline_days;
    if (overdue > 0) {
      await sendEmailNotification({
        email: opts.email,
        taskTitle: task.title,
        deadlineDays: task.deadline_days,
        daysOverdue: overdue,
        locale: opts.locale,
      });
      sent++;
    }
  }

  return sent;
}
