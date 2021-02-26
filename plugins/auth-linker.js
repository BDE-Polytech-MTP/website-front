export default function(context) {
    return {
        httpEndpoint: `http://localhost:3001/graphql`,
        getAuth: () => {
            return context.$auth.token
        }
    }
}