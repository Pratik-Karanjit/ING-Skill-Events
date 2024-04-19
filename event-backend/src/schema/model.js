import { model } from "mongoose";
import { eventSchema } from "./eventSchema.js";
import { manpowerSchema } from "./manpowerSchema.js";
import { resourceSchema } from "./resourceSchema.js";
import { brandingSchema } from "./brandingSchema.js";
import { assetSchema } from "./assetSchema.js";

export let Events = model("Events", eventSchema);
export let Manpower = model("Manpower", manpowerSchema);
export let Resource = model("Resource", resourceSchema);
export let Branding = model("Branding", brandingSchema);
export let Asset = model("Asset", assetSchema);
