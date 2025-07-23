import { Canvas } from '@react-three/fiber'
import Dice from './Dice'
import { OrbitControls } from '@react-three/drei'

const ThreeDice = () => {
  return (
    <div css={{ height: '100vh' }}>
      <Canvas>
        <ambientLight intensity={0.5} />
        <directionalLight position={[3, 3, 3]} intensity={20} color="#90ffd4" />
        <directionalLight position={[-3, -3, -3]} intensity={20} color="#ada7ff" />
        <OrbitControls autoRotate />
        <Dice />
      </Canvas>
    </div>
  )
}

export default ThreeDice
