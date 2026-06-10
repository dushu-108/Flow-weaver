import { useRef, useState } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

function Signup() {
    const containerRef = useRef(null)
    const formRef = useRef(null)
    const titleRef = useRef(null)
    const fieldsRef = useRef([])
    const buttonRef = useRef(null)
    const orbARef = useRef(null)
    const orbBRef = useRef(null)
    const orbCRef = useRef(null)
    const navigate = useNavigate()
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirm, setConfirm] = useState('')

    useGSAP(() => {
        const orbTimeline = gsap.timeline({ repeat: -1, yoyo: true })

        orbTimeline.to(orbARef.current, {
            x: 120,
            y: 110,
            duration: 10,
            ease: 'sine.inOut'
        }, 0)
        .to(orbBRef.current, {
            x: -90,
            y: 90,
            duration: 11,
            ease: 'sine.inOut'
        }, 0)
        .to(orbCRef.current, {
            x: 80,
            y: -80,
            duration: 12,
            ease: 'sine.inOut'
        }, 0)

        gsap.fromTo(formRef.current,
            { opacity: 0, y: 30, scale: 0.95 },
            { opacity: 1, y: 0, scale: 1, duration: 1, ease: 'power3.out' }
        )

        gsap.fromTo(titleRef.current,
            { opacity: 0, y: -20 },
            { opacity: 1, y: 0, duration: 0.7, delay: 0.2, ease: 'back.out(1.4)' }
        )

        gsap.fromTo(fieldsRef.current,
            { opacity: 0, x: -40 },
            { opacity: 1, x: 0, duration: 0.7, stagger: 0.18, delay: 0.4, ease: 'power2.out' }
        )

        gsap.fromTo(buttonRef.current,
            { opacity: 0, scale: 0.8 },
            { opacity: 1, scale: 1, duration: 0.6, delay: 0.9, ease: 'back.out(1.5)' }
        )

        return () => {
            orbTimeline.kill()
        }
    }, [])

    const handleHover = (isHover) => {
        gsap.to(buttonRef.current, {
            boxShadow: isHover
                ? '0 0 25px rgba(34, 211, 238, 0.8), 0 0 50px rgba(59, 130, 246, 0.4)'
                : '0 0 12px rgba(34, 211, 238, 0.4)',
            scale: isHover ? 1.02 : 1,
            duration: 0.3,
            ease: 'power2.out'
        })
    }

    const handleSignup = async (e) => {
        e.preventDefault()
        if (password !== confirm) {
            return toast.error("Passwords don't match")
        }
        
        try {
            const res = await axios.post('http://localhost:4000/api/auth/register', { 
                name: `${firstName} ${lastName}`.trim(), 
                email, 
                password 
            })
            // Registration doesn't return token in authcontroller.js currently, wait, I need to check. 
            // Wait, I will just navigate them to login or if it returns token, save it.
            // Let me check authcontroller.js in backend -> registerUser just returns user.
            toast.success('Account created! Please log in.')
            navigate('/')
        } catch (error) {
            toast.error(error.response?.data?.message || 'Registration failed')
        }
    }

    return (
        <div ref={containerRef} className="relative flex items-center justify-center h-screen overflow-hidden bg-gradient-to-br from-[#0B0F19] via-[#111827] to-[#0B0F19]">
            <div
                ref={orbARef}
                className="absolute w-72 h-72 bg-cyan-500 rounded-full mix-blend-screen filter blur-3xl opacity-20 pointer-events-none"
                style={{ top: '8%', right: '12%' }}
            />
            <div
                ref={orbBRef}
                className="absolute w-80 h-80 bg-fuchsia-500 rounded-full mix-blend-screen filter blur-3xl opacity-18 pointer-events-none"
                style={{ bottom: '6%', left: '8%' }}
            />
            <div
                ref={orbCRef}
                className="absolute w-64 h-64 bg-blue-500 rounded-full mix-blend-screen filter blur-3xl opacity-15 pointer-events-none"
                style={{ top: '45%', left: '50%', transform: 'translate(-50%, -50%)' }}
            />

            <div className="absolute inset-0 opacity-5 pointer-events-none"
                style={{
                    backgroundImage: 'linear-gradient(0deg, transparent 24%, rgba(255,255,255,.06) 25%, rgba(255,255,255,.06) 26%, transparent 27%, transparent 74%, rgba(255,255,255,.06) 75%, rgba(255,255,255,.06) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(255,255,255,.06) 25%, rgba(255,255,255,.06) 26%, transparent 27%, transparent 74%, rgba(255,255,255,.06) 75%, rgba(255,255,255,.06) 76%, transparent 77%, transparent)',
                    backgroundSize: '48px 48px'
                }}
            />

            <form
                ref={formRef}
                onSubmit={handleSignup}
                className="relative w-full max-w-lg bg-[#121827]/95 border border-[#2e3a55] rounded-[2rem] shadow-2xl backdrop-blur-xl p-10 text-white"
            >
                <div ref={titleRef} className="mb-10 text-center">
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">Create Account</h1>
                    <p className="mt-3 text-sm text-gray-300">Start your journey with a sleek account setup</p>
                </div>

                <div ref={el => fieldsRef.current[0] = el} className="grid gap-5 sm:grid-cols-2">
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">First name</label>
                        <input
                            className="w-full rounded-3xl border border-[#2e3a55] bg-[#0B0F19] px-4 py-3 text-white outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/30"
                            type="text"
                            placeholder="John"
                            value={firstName}
                            onChange={e => setFirstName(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Last name</label>
                        <input
                            className="w-full rounded-3xl border border-[#2e3a55] bg-[#0B0F19] px-4 py-3 text-white outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/30"
                            type="text"
                            placeholder="Doe"
                            value={lastName}
                            onChange={e => setLastName(e.target.value)}
                            required
                        />
                    </div>
                </div>

                <div ref={el => fieldsRef.current[1] = el}>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                    <input
                        className="w-full rounded-3xl border border-[#2e3a55] bg-[#0B0F19] px-4 py-3 text-white outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/30"
                        type="email"
                        placeholder="you@example.com"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                    />
                </div>

                <div ref={el => fieldsRef.current[2] = el} className="grid gap-5 sm:grid-cols-2">
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
                        <input
                            className="w-full rounded-3xl border border-[#2e3a55] bg-[#0B0F19] px-4 py-3 text-white outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/30"
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Confirm</label>
                        <input
                            className="w-full rounded-3xl border border-[#2e3a55] bg-[#0B0F19] px-4 py-3 text-white outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/30"
                            type="password"
                            placeholder="••••••••"
                            value={confirm}
                            onChange={e => setConfirm(e.target.value)}
                            required
                        />
                    </div>
                </div>

                <div ref={el => fieldsRef.current[3] = el} className="flex items-center justify-between text-sm text-gray-400 mt-2">
                    <label className="flex items-center gap-2">
                        <input type="checkbox" className="w-4 h-4 rounded border border-[#2e3a55] bg-[#0B0F19] text-cyan-400 focus:ring-cyan-500" />
                        <span>Keep me signed in</span>
                    </label>
                    <a href="#" className="text-cyan-300 hover:text-cyan-200">Need help?</a>
                </div>

                <button
                    ref={buttonRef}
                    type="submit"
                    onMouseEnter={() => handleHover(true)}
                    onMouseLeave={() => handleHover(false)}
                    className="mt-6 w-full rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 px-6 py-3 text-base font-semibold text-slate-950 shadow-lg shadow-cyan-500/20 transition"
                >
                    Create Account
                </button>

                <p ref={el => fieldsRef.current[4] = el} className="mt-6 text-center text-sm text-gray-400">
                    Already have an account? <a href="/" className="text-cyan-300 hover:text-cyan-200">Sign in</a>
                </p>
            </form>
        </div>
    )
}

export default Signup
