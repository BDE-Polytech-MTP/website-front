export default function(context) {
    return {
        httpEndpoint: `${context.env.API_URL}graphql`,
        getAuth: () => {
            return context.$auth.token
        }
    }
}