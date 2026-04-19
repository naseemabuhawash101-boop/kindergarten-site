import crypto from "crypto";

export default function handler(req, res) {
  const privateKey = process.env.IMAGEKIT_PRIVATE_KEY;

  const token = crypto.randomBytes(16).toString("hex");
  const expire = Math.floor(Date.now() / 1000) + 2400;

  const signature = crypto
    .createHmac("sha1", privateKey)
    .update(token + expire)
    .digest("hex");

  res.status(200).json({
    token,
    expire,
    signature,
  });
}
