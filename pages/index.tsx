'use client';

import React, { useState, useEffect } from 'react';
import { MusicPlayer } from '@/components/MusicPlayer';
import { SearchBox } from '@/components/SearchBox';
import { PlaylistManager } from '@/components/PlaylistManager';
import { TrackList } from '@/components/TrackList';
import { useAuth } from '@/store/authStore';
import { FaUser, FaSignOut, FaFire, FaMusic } from 'react-icons/fa';

interface Track {
  id: string;
  title: string;
  artist: string;
  album: string;
  duration: number;
  url: string;
  cover: string;
  plays?: number;
}

interface Playlist {
  id: string;
  name: string;
  tracks: Track[];
  createdAt: string;
  cover?: string;
}

export default function Home() {
  const { user, logout, token } = useAuth();
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [tracks, setTracks] = useState<Track[]>([]);
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [currentPlaylistId, setCurrentPlaylistId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'home' | 'search' | 'playlists' | 'favorites'>('home');

  useEffect(() => {
    fetchTracks();
    if (token) {
      fetchPlaylists();
    }
  }, [token]);

  const fetchTracks = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/tracks');
      const data = await response.json();
      setTracks(
        data.tracks.map((t: any) => ({
          id: t.id,
          title: t.title,
          artist: t.artist,
          album: t.album,
          duration: t.duration,
          url: t.file_url,
          cover: t.cover_url,
          plays: t.play_count,
        }))
      );
    } catch (error) {
      console.error('Failed to fetch tracks:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchPlaylists = async () => {
    if (!token) return;
    try {
      const response = await fetch('/api/playlists', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setPlaylists(
        data.playlists.map((p: any) => ({
          id: p.id,
          name: p.name,
          tracks: [],
          createdAt: p.created_at,
          cover: p.cover_url,
        }))
      );
    } catch (error) {
      console.error('Failed to fetch playlists:', error);
    }
  };

  const handleCreatePlaylist = async (name: string) => {
    if (!token) return;

    try {
      const response = await fetch('/api/playlists', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name, description: '' }),
      });

      const data = await response.json();
      setPlaylists([
        ...playlists,
        {
          id: data.playlist.id,
          name: data.playlist.name,
          tracks: [],
          createdAt: data.playlist.created_at,
        },
      ]);
    } catch (error) {
      console.error('Failed to create playlist:', error);
    }
  };

  const handleDeletePlaylist = (id: string) => {
    setPlaylists(playlists.filter((p) => p.id !== id));
  };

  const handlePlayNext = () => {
    const currentIndex = tracks.findIndex((t) => t.id === currentTrack?.id);
    if (currentIndex < tracks.length - 1) {
      setCurrentTrack(tracks[currentIndex + 1]);
    }
  };

  const handlePlayPrevious = () => {
    const currentIndex = tracks.findIndex((t) => t.id === currentTrack?.id);
    if (currentIndex > 0) {
      setCurrentTrack(tracks[currentIndex - 1]);
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return (
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
                <FaFire className="text-orange-500" /> Trending Now
              </h2>
              <TrackList
                tracks={tracks.slice(0, 10)}
                onPlay={setCurrentTrack}
                isLoading={isLoading}
              />
            </div>

            <div>
              <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
                <FaMusic className="text-blue-500" /> All Tracks
              </h2>
              <TrackList
                tracks={tracks}
                onPlay={setCurrentTrack}
                isLoading={isLoading}
              />
            </div>
          </div>
        );

      case 'playlists':
        return token ? (
          <PlaylistManager
            playlists={playlists}
            onCreatePlaylist={handleCreatePlaylist}
            onDeletePlaylist={handleDeletePlaylist}
            onSelectPlaylist={setCurrentPlaylistId}
            onAddTrack={() => {}}
          />
        ) : (
          <div className="text-center text-gray-400 py-8">
            <p>Please log in to manage playlists</p>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-black/80 backdrop-blur border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <FaMusic className="text-blue-500 text-2xl" />
            <h1 className="text-2xl font-bold">CrownTunz Music</h1>
          </div>

          <div className="flex-1 max-w-md mx-auto">
            <SearchBox onSearch={() => {}} onResultSelect={setCurrentTrack} />
          </div>

          <div className="flex items-center gap-4">
            {user ? (
              <>
                <div className="flex items-center gap-2">
                  {user.avatar && (
                    <img
                      src={user.avatar}
                      alt={user.username}
                      className="w-8 h-8 rounded-full"
                    />
                  )}
                  <span className="text-sm">{user.username}</span>
                </div>
                <button
                  onClick={logout}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 transition"
                >
                  <FaSignOut /> Logout
                </button>
              </>
            ) : (
              <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 transition">
                <FaUser /> Login
              </button>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Navigation Tabs */}
        <div className="flex gap-4 mb-8 border-b border-gray-800">
          {(['home', 'search', 'playlists', 'favorites'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 border-b-2 transition ${
                activeTab === tab
                  ? 'border-blue-500 text-blue-400'
                  : 'border-transparent text-gray-400 hover:text-gray-300'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="mb-32">{renderContent()}</div>
      </main>

      {/* Player Footer */}
      <footer className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-black to-gray-900 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <MusicPlayer
            track={currentTrack}
            onNext={handlePlayNext}
            onPrevious={handlePlayPrevious}
          />
        </div>
      </footer>
    </div>
  );
}
