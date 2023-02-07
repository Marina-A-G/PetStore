export const withQuery = (WrappedComponent) => function ({
  isLoading, isError, error, refetch, ...rest
})
// передаем необходимый для HOC набор пропсов плюс то, что прокинем дальше в сам компонент, необходимое уже для самого компонента
{
  if (isLoading) return <div>Грузимся мы...</div>
  if (isError) {
    return (
      <div>
        {`Ошибочка вышла. Вот такая: ${error}`}
      </div>
    )
  }

  return <WrappedComponent {...rest} />
}

/*
Компонент высшего порядка - HOC - High Order Component
Компонент высшего порядка – функции, которые принимают компонент, оборачивают его и производят с ним некоторые дополнительные манипуляции.
Это паттерн проектирования, который расширяет базовую функцию без изменения тела этой функции. По сути, добавляем поведение компоненту, не изменяя тело компонента
Принимает компонент, возвращает компонент. Новый компонент - это function {...}. Этот компонент может принимать пропсы. То есть, все компоненты, которые будут предаваться в HOC withQuery, должны передавать набор перечисленных пропсов. Плюс он должен принимать те пропсы, которые в нем используются внутри (это то, что прописано в его return в коде самого компонента). Поэтому после пропсов, необходимых для HOC, пишем ...rest и вставляем его в return HOC'а, чтобы передать внутрь компонента
Для чего:
Обработка флагов от useQuery практически одинакова для всех запросов. Чтобы не писать одинаковый код каждый раз – компонент высшего порядка.
Как использовать: 2:30
на примере userListю Теперь компонент можно поделить на 2 части.
Ниже пишем const UserListContent -() => {} и переносим туда все, что возвращает разметку, в этот новый компонент.
Еще ниже создаем const UserListContentWithQuery = withQuery (UserListContent), а его уже возвращаем в return в UserList.
*/