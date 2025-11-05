import { Inngest } from "inngest";
import userModel from "../models/user.model.js";

// Create a client to send and receive events
export const inngest = new Inngest({ id: "project-management" });

// Inngest Function to save user data to a database
const syncUserCreation = inngest.createFunction({id:'sync-user-from-clerk'},
  {event:'clerk/user.created'}, async ({ event }) => {
    const {data} = event;

    await userModel.create({
       id: data.id,
      email: data?.email_addresses?.[0]?.email_addres,
      name: data?.first_name + " " + data?.last_name,
      image: data?.image_url,
    });
    // Logic to sync user data to your database goes here
    console.log("Syncing user:", data);
  }
)          


// inngest function to delete user from database

const syncUserDeletion = inngest.createFunction({id:'delete-user-with-clerk'},
  {event:'clerk/user.deleted'}, async ({ event }) => {
    const {data} = event;

    await userModel.deleteOne({
      id: data.id,
    });
  }
)          

// Inngest Function to save user data to a database
const syncUserUpdation = inngest.createFunction({id:'update-user-from-clerk'},
  {event:'clerk/user.updated'}, async ({ event }) => {
    const {data} = event;

     await userModel.updateOne(
      { id: data.id }, // filter condition
      {
        $set: {
          email: data?.email_addresses?.[0]?.email_address || "",
          name: `${data?.first_name || ""} ${data?.last_name || ""}`.trim(),
          image: data?.image_url,
        },
      }
    );

    console.log("♻️ User updated:", data.id);
  }
);     


// Create an empty array where we'll export future Inngest functions
export const functions = [syncUserCreation,syncUserDeletion,syncUserUpdation];