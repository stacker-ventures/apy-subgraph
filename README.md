# Stacker Ventures Subgraphs

This project holds a subgraph that is available for query on [The Graph](https://thegraph.com/). Access to the hosted data is enabled via GraphQL.

## Subgraph Development

In order to update the current Subgraph, the following steps are to be taken:

- Add your new schemas on the `schema.graphql` file, this file updating this file requires at GraphQL basic knowledge about modeling data.

- Update the `subgraph.yaml` file to add new data-sources (smart contracts) and their respective configurations. You can follow the current setup as a guide. In short, you want to add a new data-source under the `dataSources` array, using `yaml` syntax.

- After updating the schema and the subgraph config, you need to run `yarn codegen` or `npm run codegen`. This will generate the AssemblyScript typings for all the schemas and will update the `mappings.ts` to reflect any new event handler on any of the declared contracts.

- In order to deploy your changes, just run `yarn build && yarn deploy`. This will make your changes available in [The Graph](https://thegraph.com/) hosted service and the subgraph will sync against the network.

You can find a documentation on how to create a subgraph from scratch [here](https://thegraph.com/docs/quick-start#local-development).

## Using Truffle to develop Subgraph Smart Contracts

- You can code your smart contracts in the `contracts` folder

- Add your contracts migrations on the `migrations` file

- Run `truffle compile` to generate the `.json` file for your contracts, these files will contain the ABI as part of the content.

- Run `truffle migrate --network put-network-here` to make your contracts available in any network.

Reference to Truffle's documentation [here](https://www.trufflesuite.com/docs/truffle/overview).

## TODO

- Create subgraph related to this project [here](https://thegraph.com/explorer/subgraph/create?account=All%20Subgraphs).

- Update `package.json` scripts to point to the correct subgraph by replacing `organization/tired-subgraph` with the correct subgraph name.
