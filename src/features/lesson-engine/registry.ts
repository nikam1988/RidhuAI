import { FC } from 'react'
import { BlockType, BlockProps } from './types'
import { StoryBlock } from './blocks/StoryBlock'
import { FunFactBlock } from './blocks/FunFactBlock'

// Fallback block if a type is unknown
const FallbackBlock: FC<BlockProps<any>> = ({ data, onComplete, isActive }) => (
  <div className="p-4 border-2 border-dashed border-red-300 bg-red-50 text-red-700 rounded-xl">
    <p className="font-bold">Unsupported Block Type</p>
    <button onClick={onComplete} className="mt-2 text-sm underline font-bold" disabled={!isActive}>Skip</button>
  </div>
)

// The central registry
export const LessonComponentRegistry: Record<BlockType, FC<BlockProps<any>>> = {
  'story': StoryBlock,
  'fun_fact': FunFactBlock,
  'mini_quiz': FallbackBlock, // To be implemented
  'text_explanation': FallbackBlock, // To be implemented
  'reward': FallbackBlock, // To be implemented
}

export function getLessonComponent(type: BlockType): FC<BlockProps<any>> {
  return LessonComponentRegistry[type] || FallbackBlock
}
