# KeeperApp – Decentralized Note-taking Application

A full-stack note-taking application inspired by Google Keep, built on the **Internet Computer (ICP)** blockchain. This project demonstrates the integration of a decentralized backend with a modern React frontend.

##  Features
* **Persistent Storage:** Notes are stored on-chain using the Motoko actor model, ensuring data persistence.
* **Real-time CRUD:** Add and delete notes with instant UI updates.
* **Responsive UI:** Built with **Material UI** for a clean, professional, and mobile-friendly experience.
* **Asynchronous Integration:** Uses the **DFINITY Agent** to handle communication between the frontend and the blockchain canister.

##  Tech Stack
* **Frontend:** React.js, Material UI (MUI), JavaScript.
* **Backend:** Motoko (Internet Computer).
* **Tools:** DFX SDK, Node.js.

##  Project Structure
* `/src/dkeeper_backend`: Contains the **Motoko** actor logic (`DKeeper`) for managing the note list and persistent storage.
* `/src/dkeeper_frontend`: Contains the **React** components (`CreateArea`, `Note`, `Header`, `Footer`) and the logic for interacting with the backend.

##  Setup & Installation
1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/anhelinaPriadko/KeeperApp.git](https://github.com/anhelinaPriadko/KeeperApp.git)
    cd KeeperApp
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Start the local IC network:**
    ```bash
    dfx start --background --clean
    ```
4.  **Deploy the canisters:**
    ```bash
    dfx deploy
    ```
5.  **Run the frontend:**
    ```bash
    npm start
    ```

##  Key Lessons Learned
* Implementing the **Actor Model** in Motoko for state management.
* Handling asynchronous calls in React using `useEffect` and custom actors.
* Managing complex state transitions in a component-based architecture.
