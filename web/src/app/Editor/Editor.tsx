import React from 'react'
import { stylesheet, style } from 'typestyle'
import csstips from 'csstips'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEraser, faCopy, faTrash, faUndo } from '@fortawesome/free-solid-svg-icons'

import { DrawingGrid } from './DrawingGrid'
import { TileButton } from '../elements/TileButton'
import EditableChar from './EditableChar'
import { spaces } from '../../common/theme'
import { ControlsBar, GlyphList } from '../elements/containers'
import { GlyphOption } from '../elements/controls'
import { useToolboxState } from '../../domain/globalState'
import { useEditorCommands } from '../../domain/editor/commands'

export function Editor() {
  const toolbox = useToolboxState()
  const { activateTool, pickBrush, undo, clear, copyToClipboard } = useEditorCommands()

  const showRecent = toolbox.recent.filter(it =>
    it !== toolbox.brush
  )
  return <div className={css.editor}>
    <div className={style(csstips.vertical)} >
      <DrawingGrid />

      <ControlsBar>
        <TileButton
          active={toolbox.activeToolType === 'paint'}
          onClick={() => activateTool('paint')}
        >
          {
            toolbox.activeToolType === 'paint'
              ? <EditableChar
                value={toolbox.brush}
                onChange={pickBrush}
              />
              : <span>{toolbox.brush}</span>
          }
        </TileButton>

        <TileButton
          active={toolbox.activeToolType === 'eraser'}
          onClick={() => activateTool('eraser')}
        >
          <FontAwesomeIcon icon={faEraser} />
        </TileButton>
      </ControlsBar>

      <GlyphList>
        {
          showRecent.map(brush =>
            <GlyphOption
              key={brush}
              onClick={() => pickBrush(brush)}
            >
              {brush}
            </GlyphOption>
          )
        }
      </GlyphList>

    </div>
    <div className={css.commandButtons}>
      <TileButton
        onClick={copyToClipboard}
      >
        <FontAwesomeIcon icon={faCopy} />
      </TileButton>

      <TileButton
        onClick={() => undo()}
      >
        <FontAwesomeIcon icon={faUndo} />
      </TileButton>

      <TileButton
        onClick={() => clear()}
      >
        <FontAwesomeIcon icon={faTrash} />
      </TileButton>
    </div>

  </div>
}

const css = stylesheet({
  editor: {
    display: 'grid',
    gridTemplateColumns: 'auto min-content',
    gap: spaces.sm
  },
  commandButtons: {
    ...csstips.vertical,
    gap: spaces.sm
  }
})
