import bcrypt from "bcrypt";
import { Request, Response } from "express";
import Session from "express-session";
import MongoDBStore from "connect-mongodb-session";
import User, {UserDocument} from "../models/user";
// import { Configuration, PlaidApi, PlaidEnvironments }  from "plaid";
import * as PlaidApi from 'plaid';
import { RequestWithSession, UserController, CustomSession } from "../types/types";
import mongoose from 'mongoose';


export const create = async (req: RequestWithSession, res: Response): Promise<void> => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  console.log('After findOne operation');

  if (user) {
     res.status(409).send({ error: "409", message: "User already exists" });
     return;
  }
  try {
    console.log('Before hash operation');
    if (password === "") throw new Error();
    const hash = await bcrypt.hash(password, 10);
    console.log('After hash operation');

    console.log('Before save operation');
    const newUser = new User({
      ...req.body,
      password: hash,
      balances: [],
    });
    const user = await newUser.save();
    console.log('After save operation')
    req.session.uid = user._id;
    res.status(201).send(user);
  } catch (error) {
    res.status(400).send({ error, message: "Could not create user" });
  }
};

export const login = async (req: RequestWithSession, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    const validatedPass = user && (await bcrypt.compare(password, user.password));
    if (!validatedPass) throw new Error();
    req.session.uid = user._id;
    res.status(200).send(user);
  } catch (error) {
    res
      .status(401)
      .send({ error: "401", message: "Username or password is incorrect" });
  }
};

export const profile = async (req: RequestWithSession, res: Response): Promise<void> => {
  try {

    if(!req.user) {
      throw new Error('User not found')
    }

    const { _id, firstName, lastName } = req.user as UserDocument;
    const user = { _id, firstName, lastName };
    res.status(200).send(user);
  } catch {
    res.status(404).send({ error: Error, message: "User not found" });
  }
};

export const logout = (req: RequestWithSession, res: Response): void => {
  req.session.destroy((error) => {
    if (error) {
      res
        .status(500)
        .send({ error, message: "Could not log out, please try again" });
    } else {
      res.clearCookie("sid");
      res.status(200).send({ message: "Logout successful" });
    }
  });
};

// Configuration for the Plaid client
 const config = new PlaidApi.Configuration({
  basePath: "https://sandbox.plaid.com",
  //  "https://sandbox.plaid.com",
  // PlaidEnvironments[process.env.PLAID_ENV],
  baseOptions: {
    headers: {
      "PLAID-CLIENT-ID": process.env.PLAID_CLIENT_ID,
      "PLAID-SECRET": process.env.PLAID_SECRET,
      "Plaid-Version": "2020-09-14",
    },
  },
});

// Instantiate the Plaid client with the configuration
 const client = new PlaidApi.PlaidApi(config);

// Creates a Link token and return it
export const createLinkTokenUS = async (req: Request, res: Response): Promise<void>  => {
  const tokenResponseUS = await client.linkTokenCreate({

    user: { client_user_id: req.sessionID },
    client_name: "worldwallet",
    language: "en",
    products: ["auth", "liabilities", "transactions"] as PlaidApi.Products[],
    country_codes: ["US"] as PlaidApi.CountryCode[],
    redirect_uri: "http://localhost:8080/callback",
  });
  res.json(tokenResponseUS.data);
};

// Creates a Link token and return it
export const createLinkTokenES = async (req: Request, res: Response): Promise<void>  => {
  const tokenResponseES = await client.linkTokenCreate({
    user: { client_user_id: req.sessionID },
    client_name: "worldwallet",
    language: "en",
    products: ["auth", "transactions"] as PlaidApi.Products[],
    country_codes: ["ES"] as PlaidApi.CountryCode[],
    redirect_uri: "http://localhost:8080/callback",
  });
  res.json(tokenResponseES.data);
};

// Creates a Link token and return it
export const createLinkTokenGB = async (req: Request, res: Response): Promise<void>  => {
  const tokenResponseGB = await client.linkTokenCreate({
    user: { client_user_id: req.sessionID },
    client_name: "worldwallet",
    language: "en",
    products: ["auth", "transactions"] as PlaidApi.Products[],
    country_codes: ["GB"] as PlaidApi.CountryCode[],
    redirect_uri: "http://localhost:8080/callback",
  });
  res.json(tokenResponseGB.data);
};

// Exchanges the public token from Plaid Link for an access token
export const exchangePublicToken = async (req: RequestWithSession, res: Response): Promise<void>  => {
  try {
    const exchangeResponse = await client.itemPublicTokenExchange({
      public_token: req.body.public_token,
    });

    // Get balance data
    const balanceResponse = await client.accountsBalanceGet({
      access_token: exchangeResponse.data.access_token,
    });

    // Get the user ID from the session
    const userId = req.session.uid;

    // Find the user by ID
    const user = await User.findById(userId);

    // Check if the user exists
    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    // Concatenate the balances field for the existing user

    user.balances = (user.balances || []).concat(balanceResponse.data.accounts);

    // Save the updated user data
    await user.save();

    res.json(exchangeResponse.data);
  } catch (error) {
    console.error("Error in /api/exchange_public_token:", error);

    // Handle specific errors
    if (error instanceof mongoose.Error.CastError && (error as mongoose.Error.CastError).kind === "ObjectId") {
      res.status(400).json({ error: "Invalid user ID format" });
    }

    // Handle other unexpected errors
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getBalances = async (req: RequestWithSession, res: Response): Promise<void>  => {
  try {
    // Get the user ID from the session
    const userId = req.session.uid;

    // Use Mongoose to find the user with the matching ID
    const user = await User.findById(userId);

    // Check if the user exists
    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    // You might want to make sure that the user has the balances field
    if (!user.balances) {
      res.status(404).json({ error: "Balances not found for the user" });
      return;
    }

    // Return the user's balance data
    res.json(user.balances);
  } catch (error) {
    console.error("Error in /api/balance:", error);

    // Handle specific errors
    if (error instanceof mongoose.Error.CastError && (error as mongoose.Error.CastError).kind === "ObjectId") {
      res.status(400).json({ error: "Invalid user ID format" });
    } else {
        // Handle other unexpected errors
      res.status(500).json({ error: "Internal server error" });
    }
  }
};

export default  {
  create,
  login,
  profile,
  logout,
  createLinkTokenUS,
  createLinkTokenES,
  createLinkTokenGB,
  exchangePublicToken,
  getBalances,
};
