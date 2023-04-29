import React from 'react';

function createContext<T>(name: `${string}Context`) {
    const ctx = React.createContext<T>(null);
    ctx.displayName = name;

    function useContext() {
        const context = React.useContext(ctx);

        if (!context) {
            throw new Error(`use${name} must be used within a ${name}Provider`);
        }

        return context;
    }

    return [ctx.Provider, useContext] as const;
}

export default createContext;
