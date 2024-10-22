import express from 'express';
import { verifyUser } from '../utils/verifyUser.js';
import { createListing } from '../controller/listing.controller.js';

const listRouter = express.Router();

listRouter.post('/create', verifyUser, createListing);

export default listRouter