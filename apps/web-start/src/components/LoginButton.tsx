import { useAuth0 } from '@auth0/auth0-react';

type LoginButtonProps = {
  redirectTo?: string; // route to redirect to after login
};

export function LoginButton({ redirectTo }: LoginButtonProps) {
  const { loginWithRedirect } = useAuth0();

  const handleLogin = () => {
    const options: Record<string, any> = {
      authorizationParams: {
        scope: 'read:courses',
        prompt: 'consent',
      },
    };

    if (redirectTo) {
      options.appState = { returnTo: redirectTo };
    }

    loginWithRedirect(options);
  };

  return <button onClick={handleLogin}>Log In</button>;
}

export default LoginButton;
