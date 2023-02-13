export default interface GameSettingsProps {
  increase: () => void;
  decrease: () => void;
  changeLanguage: () => void;
  language: string;
  inputRef: React.RefObject<HTMLInputElement>;
  setError: React.Dispatch<React.SetStateAction<boolean>>;
  error: boolean;
  setShowBattery: React.Dispatch<React.SetStateAction<boolean>>;
  showBattery: boolean;
  handleStartClick: () => void;
  started: boolean;
  regexp: string;
  checkRegexp: (str: string) => boolean;
  length: number;
  difficulty: number;
  changeDifficulty: () => void;
  close: () => void;
}
