import { useEffect, useState } from 'react';
import { Play, Info, X, Star } from 'lucide-react';
import PropTypes from 'prop-types';
import ReactPlayer from 'react-player';
import Navbar from '../../components/Navbar';
import axios from '../../lib/axios';

const IMG_BASE = 'https://image.tmdb.org/t/p';

const ContentRow = ({ title, items, onSelect }) => {
    if (!items.length) return null;
    return (
        <div className="px-6 md:px-10 py-4">
            <h2 className="text-white text-lg font-semibold mb-3">{title}</h2>
            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                {items.map((item) => (
                    <img
                        key={item.id}
                        src={`${IMG_BASE}/w300${item.poster_path}`}
                        alt={item.title || item.name}
                        onClick={() => onSelect(item)}
                        className="h-40 rounded flex-shrink-0 hover:scale-105 transition-transform cursor-pointer"
                    />
                ))}
            </div>
        </div>
    );
};

ContentRow.propTypes = {
    title: PropTypes.string.isRequired,
    items: PropTypes.array.isRequired,
    onSelect: PropTypes.func.isRequired,
};

const TrailerModal = ({ trailerKey, onClose }) => (
    <div
        className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center"
        onClick={onClose}
    >
        <div
            className="relative w-full max-w-4xl aspect-video mx-4"
            onClick={(e) => e.stopPropagation()}
        >
            <button
                onClick={onClose}
                className="absolute -top-10 right-0 text-white hover:text-gray-300"
            >
                <X size={28} />
            </button>
            <ReactPlayer
                url={`https://www.youtube.com/watch?v=${trailerKey}`}
                width="100%"
                height="100%"
                playing
                controls
            />
        </div>
    </div>
);

TrailerModal.propTypes = {
    trailerKey: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
};

const InfoPanel = ({ item, type, onClose, onPlay }) => {
    const title = item.title || item.name;
    const poster = item.poster_path ? `${IMG_BASE}/w500${item.poster_path}` : null;
    const backdrop = item.backdrop_path ? `${IMG_BASE}/w1280${item.backdrop_path}` : null;
    const rating = item.vote_average?.toFixed(1);
    const year = (item.release_date || item.first_air_date || '').slice(0, 4);

    return (
        <div
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center overflow-y-auto"
            onClick={onClose}
        >
            <div
                className="relative bg-zinc-900 rounded-lg max-w-2xl w-full mx-4 my-8 overflow-hidden"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Backdrop */}
                {backdrop && (
                    <div className="relative h-64">
                        <img src={backdrop} alt={title} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 to-transparent" />
                    </div>
                )}

                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 bg-black/60 rounded-full p-1 text-white hover:bg-black"
                >
                    <X size={20} />
                </button>

                <div className="p-6 -mt-8 relative">
                    <div className="flex gap-4">
                        {poster && (
                            <img src={poster} alt={title} className="w-24 rounded flex-shrink-0 self-start" />
                        )}
                        <div>
                            <h2 className="text-white text-2xl font-bold mb-1">{title}</h2>
                            <div className="flex items-center gap-3 text-sm text-gray-400 mb-3">
                                {year && <span>{year}</span>}
                                {rating && (
                                    <span className="flex items-center gap-1">
                                        <Star size={14} className="text-yellow-400 fill-yellow-400" />
                                        {rating}
                                    </span>
                                )}
                                <span className="uppercase text-xs border border-gray-600 px-1">{type === 'movie' ? 'Movie' : 'Series'}</span>
                            </div>
                            {item.overview && (
                                <p className="text-gray-300 text-sm leading-relaxed">{item.overview}</p>
                            )}
                        </div>
                    </div>

                    <button
                        onClick={() => onPlay(item)}
                        className="mt-6 flex items-center gap-2 bg-white text-black px-6 py-2 rounded font-semibold hover:bg-gray-200 transition-colors"
                    >
                        <Play size={18} fill="black" /> Play Trailer
                    </button>
                </div>
            </div>
        </div>
    );
};

InfoPanel.propTypes = {
    item: PropTypes.object.isRequired,
    type: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
    onPlay: PropTypes.func.isRequired,
};

const HomeScreen = () => {
    const [hero, setHero] = useState(null);
    const [heroType, setHeroType] = useState('movie');
    const [popularMovies, setPopularMovies] = useState([]);
    const [topRatedMovies, setTopRatedMovies] = useState([]);
    const [popularTV, setPopularTV] = useState([]);
    const [topRatedTV, setTopRatedTV] = useState([]);
    const [loading, setLoading] = useState(true);

    const [trailerKey, setTrailerKey] = useState(null);
    const [infoItem, setInfoItem] = useState(null);
    const [infoType, setInfoType] = useState('movie');

    useEffect(() => {
        const fetchAll = async () => {
            try {
                const [movieHeroRes, popularMoviesRes, topMoviesRes, tvHeroRes, popularTVRes, topTVRes] = await Promise.allSettled([
                    axios.get('/movies/trending'),
                    axios.get('/movies/popular'),
                    axios.get('/movies/top_rated'),
                    axios.get('/tv/trending'),
                    axios.get('/tv/popular'),
                    axios.get('/tv/top_rated'),
                ]);

                if (movieHeroRes.status === 'fulfilled') {
                    setHero(movieHeroRes.value.data.content);
                    setHeroType('movie');
                } else if (tvHeroRes.status === 'fulfilled') {
                    setHero(tvHeroRes.value.data.content);
                    setHeroType('tv');
                }

                if (popularMoviesRes.status === 'fulfilled') setPopularMovies(popularMoviesRes.value.data.content || []);
                if (topMoviesRes.status === 'fulfilled') setTopRatedMovies(topMoviesRes.value.data.content || []);
                if (popularTVRes.status === 'fulfilled') setPopularTV(popularTVRes.value.data.content || []);
                if (topTVRes.status === 'fulfilled') setTopRatedTV(topTVRes.value.data.content || []);
            } catch (err) {
                console.error('Failed to load content:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchAll();
    }, []);

    const fetchAndPlayTrailer = async (item, type) => {
        const endpoint = type === 'movie'
            ? `/movies/${item.id}/trailers`
            : `/tv/${item.id}/trailers`;
        try {
            const res = await axios.get(endpoint);
            const trailers = res.data.trailers || [];
            const yt = trailers.find(t => t.site === 'YouTube') || trailers[0];
            if (yt) {
                setInfoItem(null);
                setTrailerKey(yt.key);
            }
        } catch {
            // no trailer available — nothing to show
        }
    };

    const handlePlay = () => fetchAndPlayTrailer(hero, heroType);

    const handleMoreInfo = () => {
        setInfoItem(hero);
        setInfoType(heroType);
    };

    const handleRowSelect = (item) => {
        setInfoItem(item);
        setInfoType(popularMovies.find(m => m.id === item.id) || topRatedMovies.find(m => m.id === item.id) ? 'movie' : 'tv');
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen bg-black text-white text-xl">
                Loading...
            </div>
        );
    }

    const heroTitle = hero?.title || hero?.name || '';
    const heroBackdrop = hero?.backdrop_path ? `${IMG_BASE}/original${hero.backdrop_path}` : null;

    return (
        <div className="min-h-screen bg-black text-white">
            <Navbar />

            {/* Hero */}
            {hero && (
                <div className="relative h-screen">
                    {heroBackdrop ? (
                        <img src={heroBackdrop} alt={heroTitle} className="w-full h-full object-cover" />
                    ) : (
                        <div className="w-full h-full bg-gray-900" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />

                    <div className="absolute bottom-1/3 left-6 md:left-10 max-w-xl">
                        <p className="text-sm text-gray-400 uppercase tracking-widest mb-2">
                            {heroType === 'movie' ? 'Movie' : 'TV Show'}
                        </p>
                        <h1 className="text-4xl md:text-6xl font-bold mb-4">{heroTitle}</h1>
                        {hero.overview && (
                            <p className="text-gray-300 mb-6 text-sm md:text-base line-clamp-3">{hero.overview}</p>
                        )}
                        <div className="flex gap-3">
                            <button
                                onClick={handlePlay}
                                className="flex items-center gap-2 bg-white text-black px-5 py-2 rounded font-semibold hover:bg-gray-200 transition-colors"
                            >
                                <Play size={18} fill="black" /> Play
                            </button>
                            <button
                                onClick={handleMoreInfo}
                                className="flex items-center gap-2 bg-gray-600/70 text-white px-5 py-2 rounded font-semibold hover:bg-gray-600 transition-colors"
                            >
                                <Info size={18} /> More Info
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Content rows */}
            <div className="relative z-10 -mt-24 pb-10">
                <ContentRow title="Popular Movies" items={popularMovies} onSelect={handleRowSelect} />
                <ContentRow title="Top Rated Movies" items={topRatedMovies} onSelect={handleRowSelect} />
                <ContentRow title="Popular TV Shows" items={popularTV} onSelect={handleRowSelect} />
                <ContentRow title="Top Rated TV Shows" items={topRatedTV} onSelect={handleRowSelect} />
            </div>

            {/* Trailer overlay */}
            {trailerKey && (
                <TrailerModal trailerKey={trailerKey} onClose={() => setTrailerKey(null)} />
            )}

            {/* Info panel */}
            {infoItem && (
                <InfoPanel
                    item={infoItem}
                    type={infoType}
                    onClose={() => setInfoItem(null)}
                    onPlay={(item) => fetchAndPlayTrailer(item, infoType)}
                />
            )}
        </div>
    );
};

export default HomeScreen;
