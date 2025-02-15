export interface Account {
    username?: string;
    password?: string;
  }
  
  const NEXT_API = "http://localhost:8080";
  
  export const createAccount = async (account: Account): Promise<void> => {
    if (!account) {
      throw new Error("Account data is required");
    }
  
    console.log(`${process.env.NEXT_PUBLIC_API_BASE_URL}`);
  
    const response = await fetch(`${NEXT_API}/entrepreneur`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(account),
    });
  
    console.log({
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(account),
    });
  
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        `Failed to create account: ${errorData.message || response.statusText}`
      );
    }
  };
  