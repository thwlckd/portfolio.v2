export type RedirectionOptions = { to: string };

export class Redirection extends Error {
  readonly name: string;
  readonly to: string;

  constructor({ to }: RedirectionOptions) {
    super(`Redirect to ${to}`);

    this.name = 'Redirection';
    this.to = to;
  }

  static to(this: new (args: RedirectionOptions) => Redirection, path: string) {
    return new this({ to: path });
  }

  static isSSRRedirectError(error: unknown): error is Redirection {
    return error instanceof Error && error.name === this.name;
  }
}
