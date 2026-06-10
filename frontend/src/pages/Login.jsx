
import { useRef, useState } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

function Login() {
    const containerRef = useRef(null)
    const formRef = useRef(null)
    const titleRef = useRef(null)
    const fieldsRef = useRef([])
    const buttonRef = useRef(null)
    const orb1Ref = useRef(null)
    const orb2Ref = useRef(null)
    const orb3Ref = useRef(null)
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    useGSAP(() => {
        const timeline = gsap.timeline({ repeat: -1 })
        
        timeline.to(orb1Ref.current, {
            x: 100,
            y: 100,
            duration: 8,
            ease: 'sine.inOut'
        }, 0)
        .to(orb1Ref.current, {
            x: -100,
            y: -100,
            duration: 8,
            ease: 'sine.inOut'
        }, 0)
        
        timeline.to(orb2Ref.current, {
            x: -100,
            y: 100,
            duration: 10,
            ease: 'sine.inOut'
        }, 0)
        .to(orb2Ref.current, {
            x: 100,
            y: -100,
            duration: 10,
            ease: 'sine.inOut'
        }, 0)
        
        timeline.to(orb3Ref.current, {
            x: 80,
            y: -80,
            duration: 12,
            ease: 'sine.inOut'
        }, 0)
        .to(orb3Ref.current, {
            x: -80,
            y: 80,
            duration: 12,
            ease: 'sine.inOut'
        }, 0)

        const masterTimeline = gsap.timeline()

        masterTimeline.to(containerRef.current, {
            boxShadow: '0 0 40px rgba(59, 130, 246, 0.3)',
            duration: 2,
            ease: 'power1.inOut',
            repeat: -1,
            yoyo: true
        }, 0)

        masterTimeline.fromTo(formRef.current,
            { opacity: 0, scale: 0.8, y: 30 },
            { opacity: 1, scale: 1, y: 0, duration: 1, ease: 'elastic.out(1, 0.5)' },
            0
        )

        gsap.fromTo(formRef.current,
            { boxShadow: '0 0 0px rgba(59, 130, 246, 0)' },
            { 
                boxShadow: '0 0 30px rgba(59, 130, 246, 0.5)',
                duration: 2,
                ease: 'power1.inOut',
                repeat: -1,
                yoyo: true,
                delay: 0.5
            }
        )

        gsap.fromTo(titleRef.current,
            { opacity: 0, y: -30, scale: 0.8 },
            { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: 'back.out', delay: 0.2 }
        )

        gsap.fromTo(fieldsRef.current,
            { opacity: 0, x: -40, rotationZ: -5 },
            {
                opacity: 1,
                x: 0,
                rotationZ: 0,
                duration: 0.7,
                ease: 'power3.out',
                stagger: 0.2,
                delay: 0.4
            }
        )

        gsap.fromTo(buttonRef.current,
            { opacity: 0, scale: 0.7, y: 20 },
            { opacity: 1, scale: 1, y: 0, duration: 0.8, ease: 'back.out', delay: 1 }
        )

        return () => {
            timeline.kill()
            masterTimeline.kill()
        }
    }, [])

    const handleButtonHover = (isHover) => {
        gsap.to(buttonRef.current, {
            boxShadow: isHover 
                ? '0 0 30px rgba(59, 130, 246, 1), 0 0 60px rgba(59, 130, 246, 0.5)' 
                : '0 0 10px rgba(59, 130, 246, 0.5)',
            scale: isHover ? 1.05 : 1,
            duration: 0.3,
            ease: 'power2.out'
        })
    }

    const handleLogin = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post('http://localhost:4000/api/auth/login', { email, password })
            if (res.data.token) {
                localStorage.setItem('token', res.data.token)
                toast.success('Login successful!')
                navigate('/dashboard')
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Login failed')
        }
    }

    return (
        <div ref={containerRef} className="relative flex items-center justify-center h-screen bg-gradient-to-br from-[#0B0F19] via-[#1a1a2e] to-[#0B0F19] overflow-hidden">
            <div 
                ref={orb1Ref}
                className="absolute w-96 h-96 bg-blue-600 rounded-full mix-blend-screen filter blur-3xl opacity-20 pointer-events-none"
                style={{ top: '10%', right: '10%' }}
            />
            <div 
                ref={orb2Ref}
                className="absolute w-80 h-80 bg-purple-600 rounded-full mix-blend-screen filter blur-3xl opacity-15 pointer-events-none"
                style={{ bottom: '10%', left: '10%' }}
            />
            <div 
                ref={orb3Ref}
                className="absolute w-72 h-72 bg-cyan-500 rounded-full mix-blend-screen filter blur-3xl opacity-10 pointer-events-none"
                style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
            />

            <div className="absolute inset-0 opacity-5 pointer-events-none" 
                style={{
                    backgroundImage: 'linear-gradient(0deg, transparent 24%, rgba(255,255,255,.05) 25%, rgba(255,255,255,.05) 26%, transparent 27%, transparent 74%, rgba(255,255,255,.05) 75%, rgba(255,255,255,.05) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(255,255,255,.05) 25%, rgba(255,255,255,.05) 26%, transparent 27%, transparent 74%, rgba(255,255,255,.05) 75%, rgba(255,255,255,.05) 76%, transparent 77%, transparent)',
                    backgroundSize: '50px 50px'
                }}
            />

            <form 
                ref={formRef}
                onSubmit={handleLogin}
                className="relative w-full max-w-lg bg-[#121827]/95 border border-[#2e3a55] rounded-[2rem] shadow-2xl backdrop-blur-xl p-10 text-white"
            >
                <div ref={titleRef} className="mb-10 text-center">
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">Welcome Back</h1>
                    <p className="text-gray-300 text-sm">Sign in to your account</p>
                </div>
                
                <div ref={el => fieldsRef.current[0] = el}>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                    <input 
                        className="w-full rounded-3xl border border-[#2e3a55] bg-[#0B0F19] px-4 py-3 text-white outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/30" 
                        type="email" 
                        placeholder="Enter your email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                    />
                </div>
                
                <div ref={el => fieldsRef.current[1] = el}>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
                    <input 
                        className="w-full rounded-3xl border border-[#2e3a55] bg-[#0B0F19] px-4 py-3 text-white outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/30" 
                        type="password" 
                        placeholder="Enter your password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                    />
                </div>
                
                <div ref={el => fieldsRef.current[2] = el} className="flex items-center justify-between text-sm text-gray-400 mt-2">
                    <label className="flex items-center gap-2">
                        <input type="checkbox" className="w-4 h-4 rounded border border-[#2e3a55] bg-[#0B0F19] text-cyan-400 focus:ring-cyan-500" />
                        <span>Remember me</span>
                    </label>
                </div>
                
                <button 
                    ref={buttonRef}
                    className="mt-6 w-full rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 px-6 py-3 text-base font-semibold text-slate-950 shadow-lg shadow-cyan-500/20 transition" 
                    type="submit"
                    onMouseEnter={() => handleButtonHover(true)}
                    onMouseLeave={() => handleButtonHover(false)}
                >
                    Sign In
                </button>
                
                <p ref={el => fieldsRef.current[3] = el} className="mt-6 text-center text-sm text-gray-400">
                    Don't have an account? <a href="/signup" className="text-cyan-300 hover:text-cyan-200">Sign up</a>
                </p>
            </form>
        </div>
    )
}

export default Login