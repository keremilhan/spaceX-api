import { ApolloProvider } from '@apollo/client';
import Dashboard from './pages/Dashboard';
import client from './apollo/ApolloClient';

function App() {
    return (
        <ApolloProvider client={client}>
            <Dashboard />
        </ApolloProvider>
    );
}

export default App;
