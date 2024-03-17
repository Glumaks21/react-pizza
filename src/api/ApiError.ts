export default class ApiError extends Error {
  constructor(msg: string) {
    super(msg);
  }
}
