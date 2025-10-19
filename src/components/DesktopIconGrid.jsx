import clsx from 'clsx'
import DesktopIcon from './DesktopIcon'

function DesktopIconGrid({ icons, className }) {
  return (
    <div
      className={clsx(
        'grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-4 justify-items-start',
        className
      )}
    >
      {icons.map((icon) => (
        <DesktopIcon key={icon.id} icon={icon} />
      ))}
    </div>
  )
}

export default DesktopIconGrid
