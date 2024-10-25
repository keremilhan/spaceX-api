import { ApolloProvider } from '@apollo/client';
import client from './ApolloClient';
import { ReactNode } from 'react';

interface AppProps {
    children: ReactNode;
}
function App(props: AppProps) {
    return <ApolloProvider client={client}>{props.children}</ApolloProvider>;
}

export default App;
