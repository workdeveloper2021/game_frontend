export default function AuthGuard({ children }) {
  fetch("/profile", {
    headers: {
      Auth: "Bearer " + localStorage.getItem("accessToken"),
    },
  }).then((user) => {
    if (user) {
      this.setState({
        isAuthenticated: true,
      });
    } else {
      // redirect to login
    }
  });
  if (this.state.isAuthenticated) {
    return children;
  }
  return Loading;
}

const page = () => {
  return (
    <AuthGuard>
      <Dashboard />
    </AuthGuard>
  );
};
