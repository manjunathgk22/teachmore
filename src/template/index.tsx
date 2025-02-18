import React from 'react'

const Layout = ({...props}) => {
  return (
    <div className='flex w-full h-full bg-background'>
        <SideBar />
        <div className="flex flex-col flex-1">
            <Header />
        <main className='flex flex-col items-center justify-center flex-1 overflow-auto'>
            {props.children}
        </main>
        </div>
    </div>
  )
}

export default Layout

const Header = () => {
    return <div className='border-b flex h-[72px]'>Header</div>
}

const SideBar = () => {
    return (
        <div className='w-[150px] h-full bg-background border-r'>
        <div className='flex flex-col items-center justify-center'>
            <div className='w-1/2 h-1/2 bg-white rounded-full'></div>
            <div className='flex flex-col items-center justify-center'>
            <h1>sidebar</h1>
            </div>
        </div>
        </div>
    )
}

const withLayout = (Component: React.ComponentType) => {
    const WrappedComponent: React.FC = (props) => (
        <Layout>
            <Component {...props} />
        </Layout>
    );
    WrappedComponent.displayName = `withLayout(${(Component.displayName ?? Component.name) || 'Component'})`;
    return WrappedComponent;
}

export { withLayout }

