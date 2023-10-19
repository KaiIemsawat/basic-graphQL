import Client from "./components/Client";
import Header from "./components/Header";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";

const cache = new InMemoryCache({
    typePolicies: {
        Query: {
            fields: {
                clients: {
                    merge(existing, incoming) {
                        return incoming;
                    },
                },
                projects: {
                    merge(existing, incoming) {
                        return incoming;
                    },
                },
            },
        },
    },
});
const client = new ApolloClient({
    uri: "http://localhost:5500/graphql",
    cache,
});

function App() {
    return (
        <>
            <ApolloProvider client={client}>
                <Header />
                <div className="container">
                    <Client />
                </div>
            </ApolloProvider>
        </>
    );
}

export default App;
