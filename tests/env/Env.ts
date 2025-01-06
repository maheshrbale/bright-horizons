import dotenv from "dotenv";

dotenv.config();

export class Environment {
  private static _instance: Environment;
  public HomePageURL: string;

  private constructor() {
    this.HomePageURL =
      process.env.HOME_URL || "https://www.brighthorizons.com/";
  }

  public static Instance(): Environment {
    if (this._instance == null) {
      this._instance = new Environment();
    }
    return this._instance;
  }
}
