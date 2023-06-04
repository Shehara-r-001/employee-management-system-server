###################
# BUILD FOR LOCAL DEVELOPMENT
###################

FROM node:18-alpine As development

# Create app directory
WORKDIR /usr/src

# Copy application dependency manifests to the container image.
# A wildcard is used to ensure copying both package.json AND package-lock.json (when available).
# Copying this first prevents re-running npm install on every code change.
COPY --chown=node:node package.json ./
COPY --chown=node:node yarn.lock ./

# Install app dependencies
RUN yarn install

# Bundle app source
COPY --chown=node:node . .

# Use the node user from the image (instead of the root user)
USER node

# EXPOSE 3000

###################
# RUN UNIT TESTS
###################

# FROM development as test

# ENV CI=true

# RUN yarn test

###################
# BUILD FOR PRODUCTION
###################

FROM node:18-alpine As build

WORKDIR /usr/src

COPY --chown=node:node package.json ./
COPY --chown=node:node yarn.lock ./

# In order to run `npm run build` we need access to the Nest CLI which is a dev dependency. In the previous development stage we ran `npm ci` which installed all dependencies, so we can copy over the node_modules directory from the development image
COPY --chown=node:node --from=development /usr/src/node_modules ./node_modules

COPY --chown=node:node . .

# Run the build command which creates the production bundle
RUN yarn build

RUN yarn install --frozen-lockfile && yarn cache clean

USER node

###################
# RUN PRODUCTION BUILD
###################

FROM node:18-alpine As production

# Copy the bundled code from the build stage to the production image
COPY --chown=node:node --from=build /usr/src/node_modules ./node_modules
COPY --chown=node:node --from=build /usr/src/dist ./dist

ENV NODE_ENV=prod

# Start the server using the production build
CMD [ "node", "dist/index.js" ]

EXPOSE 8080

