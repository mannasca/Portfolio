import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { UserProvider, useUser } from '../contexts/UserContext';

describe('UserContext', () => {
  it('provides context hook', () => {
    const wrapper = ({ children }) => <UserProvider>{children}</UserProvider>;
    const { result } = renderHook(() => useUser(), { wrapper });

    // Check that context is defined
    expect(result.current).toBeDefined();
  });

  it('login function is callable', () => {
    const wrapper = ({ children }) => <UserProvider>{children}</UserProvider>;
    const { result } = renderHook(() => useUser(), { wrapper });

    expect(typeof result.current.login).toBe('function');
  });

  it('logout function is callable', () => {
    const wrapper = ({ children }) => <UserProvider>{children}</UserProvider>;
    const { result } = renderHook(() => useUser(), { wrapper });

    expect(typeof result.current.logout).toBe('function');
  });

  it('isAuthenticated function is callable', () => {
    const wrapper = ({ children }) => <UserProvider>{children}</UserProvider>;
    const { result } = renderHook(() => useUser(), { wrapper });

    expect(typeof result.current.isAuthenticated).toBe('function');
  });

  it('isAdmin function is callable', () => {
    const wrapper = ({ children }) => <UserProvider>{children}</UserProvider>;
    const { result } = renderHook(() => useUser(), { wrapper });

    expect(typeof result.current.isAdmin).toBe('function');
  });

  it('userRole is initially set', () => {
    const wrapper = ({ children }) => <UserProvider>{children}</UserProvider>;
    const { result } = renderHook(() => useUser(), { wrapper });

    expect(result.current.userRole).toBeDefined();
  });
});
