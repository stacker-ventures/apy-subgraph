# Stacker Ventures Subgraphs

This project holds a subgraph that is available for query on [The Graph](https://thegraph.com/). Access to the hosted data is enabled via GraphQL.

This is the subgraph source code, which contains the subgraph manifest and the `mappers` code. The way [The Graph](https://thegraph.com/) is by using subgraph to index data. The service listens to the events emitted by the defined contracts in the manifest, and based on the coded configuration, it will handle the events via the mappers in the `src/mapping.ts` file. The file will contain a function for each event that the subgraph is configured to listen to.

The service will store the data that the mappers tell it to store, and it will make it available via GraphQL for querying purposes.

## Subgraph Development

In order to update the current Subgraph, the following steps are to be taken:

- Add your new schemas on the `schema.graphql` file, this file updating this file requires at GraphQL basic knowledge about modeling data.

- Make sure you add the ABI in a json file in the `abis` folder.

- Update the `subgraph.yaml` file to add new data-sources (smart contracts) and their respective configurations. You can follow the current setup as a guide. In short, you want to add a new data-source under the `dataSources` array, using `yaml` syntax. Remember to reference the ABI you created in the step before, as part of the `yaml` config in this file.

- After updating the schema and the subgraph config, you need to run `yarn codegen` or `npm run codegen`. This will generate the AssemblyScript typings for all the schemas and will update the `src/mapping.ts` to reflect any new event handler on any of the declared contracts.

- In order to deploy your changes, just run `yarn build && yarn deploy`. This will make your changes available in [The Graph](https://thegraph.com/) hosted service and the subgraph will sync against the network.

You can find a documentation on how to create a subgraph from scratch [here](https://thegraph.com/docs/quick-start#local-development).

The reference to AssemblyScript can be found [here](https://www.assemblyscript.org/introduction.html) and the API support for AssemblyScript in The Graph mappers can be found [here](https://thegraph.com/docs/assemblyscript-api).

## Using Truffle to develop Subgraph Smart Contracts

- You can code your smart contracts in the `contracts` folder

- Add your contracts migrations on the `migrations` file

- Run `truffle compile` to generate the `.json` file for your contracts, these files will contain the ABI as part of the content.

- Run `truffle migrate --network put-network-here` to make your contracts available in any network.

Reference to Truffle's documentation [here](https://www.trufflesuite.com/docs/truffle/overview).

## TODO

- Create subgraph related to this project [here](https://thegraph.com/explorer/subgraph/create?account=All%20Subgraphs).

- Update `package.json` scripts to point to the correct subgraph by replacing `organization/tired-subgraph` with the correct subgraph name.

- Update the current `subgraph.yaml` file to add the correct contract address when we go live into prod.
