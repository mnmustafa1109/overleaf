import { createContext, useContext, useMemo } from 'react'
import type { PropsWithChildren } from 'react'
import type {
  FontFamily,
  LineHeight,
  OverallTheme,
} from '../../../../../modules/source-editor/frontend/js/extensions/theme'
import type {
  Keybindings,
  PdfViewer,
  ProjectCompiler,
} from '../../../../../types/project-settings'
import useSetProjectWideSettings from '../hooks/use-set-project-wide-settings'
import useUserWideSettings from '../hooks/use-user-wide-settings'

type ProjectSettingsContextValue = {
  compiler?: ProjectCompiler
  setCompiler: (compiler: ProjectCompiler) => void
  imageName?: string
  setImageName: (imageName: string) => void
  rootDocId?: string
  setRootDocId: (rootDocId: string) => void
  spellCheckLanguage?: string
  setSpellCheckLanguage: (spellCheckLanguage: string) => void
  autoComplete: boolean
  setAutoComplete: (autoComplete: boolean) => void
  autoPairDelimiters: boolean
  setAutoPairDelimiters: (autoPairDelimiters: boolean) => void
  syntaxValidation: boolean
  setSyntaxValidation: (syntaxValidation: boolean) => void
  mode: Keybindings
  setMode: (mode: Keybindings) => void
  editorTheme: string
  setEditorTheme: (editorTheme: string) => void
  overallTheme: OverallTheme
  setOverallTheme: (overallTheme: OverallTheme) => void
  fontSize: string
  setFontSize: (fontSize: string) => void
  fontFamily: FontFamily
  setFontFamily: (fontFamily: FontFamily) => void
  lineHeight: LineHeight
  setLineHeight: (lineHeight: LineHeight) => void
  pdfViewer: PdfViewer
  setPdfViewer: (pdfViewer: PdfViewer) => void
}

export const ProjectSettingsContext = createContext<
  ProjectSettingsContextValue | undefined
>(undefined)

export function ProjectSettingsProvider({
  children,
}: PropsWithChildren<Record<string, never>>) {
  const {
    compiler,
    setCompiler,
    imageName,
    setImageName,
    rootDocId,
    setRootDocId,
    spellCheckLanguage,
    setSpellCheckLanguage,
  } = useSetProjectWideSettings()

  const {
    autoComplete,
    setAutoComplete,
    autoPairDelimiters,
    setAutoPairDelimiters,
    syntaxValidation,
    setSyntaxValidation,
    editorTheme,
    setEditorTheme,
    overallTheme,
    setOverallTheme,
    mode,
    setMode,
    fontSize,
    setFontSize,
    fontFamily,
    setFontFamily,
    lineHeight,
    setLineHeight,
    pdfViewer,
    setPdfViewer,
  } = useUserWideSettings()

  const value: ProjectSettingsContextValue = useMemo(
    () => ({
      compiler,
      setCompiler,
      imageName,
      setImageName,
      rootDocId,
      setRootDocId,
      spellCheckLanguage,
      setSpellCheckLanguage,
      autoComplete,
      setAutoComplete,
      autoPairDelimiters,
      setAutoPairDelimiters,
      syntaxValidation,
      setSyntaxValidation,
      editorTheme,
      setEditorTheme,
      overallTheme,
      setOverallTheme,
      mode,
      setMode,
      fontSize,
      setFontSize,
      fontFamily,
      setFontFamily,
      lineHeight,
      setLineHeight,
      pdfViewer,
      setPdfViewer,
    }),
    [
      compiler,
      setCompiler,
      imageName,
      setImageName,
      rootDocId,
      setRootDocId,
      spellCheckLanguage,
      setSpellCheckLanguage,
      autoComplete,
      setAutoComplete,
      autoPairDelimiters,
      setAutoPairDelimiters,
      syntaxValidation,
      setSyntaxValidation,
      editorTheme,
      setEditorTheme,
      overallTheme,
      setOverallTheme,
      mode,
      setMode,
      fontSize,
      setFontSize,
      fontFamily,
      setFontFamily,
      lineHeight,
      setLineHeight,
      pdfViewer,
      setPdfViewer,
    ]
  )

  return (
    <ProjectSettingsContext.Provider value={value}>
      {children}
    </ProjectSettingsContext.Provider>
  )
}

export function useProjectSettingsContext() {
  const context = useContext(ProjectSettingsContext)

  if (!context) {
    throw new Error(
      'useProjectSettingsContext is only available inside ProjectSettingsProvider'
    )
  }

  return context
}
