'use strict';

/**
 * selfie service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::selfie.selfie');
